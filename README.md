# GitHub Actions CI/CD Workshop

This is a tiny Node.js project designed to fail on its first run. It gives you a safe way to see how GitHub Actions stops a pipeline when a test fails, and how the rest of the pipeline runs after a fix.

The app calculates shipping costs. The business rule is simple: **orders of $50 or more get free shipping**. A deliberate one-character bug in `src/shipping.js` breaks that rule for an order of exactly $50.

## What the pipeline does

The workflow is in `.github/workflows/ci.yml`.

| Stage | Purpose | What happens while the bug exists |
| --- | --- | --- |
| 1. Lint and test (CI) | Installs dependencies, checks syntax, and runs automated tests. | Fails on the $50 shipping test. |
| 2. Build artifact | Creates `dist/build-info.txt` and uploads it as a GitHub Actions artifact. | Is skipped because stage 1 failed. |
| 3. Delivery demo | On a successful push to `main`, downloads the verified artifact and simulates deployment. | Is skipped because the build never ran. |

The final stage is intentionally a **deployment simulation**: it demonstrates continuous delivery without requiring cloud credentials or publishing anything. In a real application, replace the `Simulate deployment` step with a deployment action for GitHub Pages, Azure, AWS, Netlify, or your own host.

## Prerequisites

- A GitHub account
- Git
- Node.js 20 or newer (Node 22 is used in the GitHub Actions workflow)

Check your local Node version:

```bash
node --version
```

## Run it locally

From this repository directory, run:

```bash
npm ci
npm test
```

The second command should fail. Read the test name and failure message: an order at `$50` is currently charged `$5` instead of `$0`.

You can also run every local pipeline step with:

```bash
npm run verify
```

It will stop at the same failing test until you fix the bug.

## Make the pipeline pass

1. Open `src/shipping.js`.
2. Find the line marked `WORKSHOP BUG`.
3. Change the comparison so an order **equal to** `FREE_SHIPPING_THRESHOLD` qualifies for free shipping. Do not change the test.
4. Confirm the fix locally:

   ```bash
   npm test
   npm run verify
   ```

5. Commit your change and push it to GitHub. For example:

   ```bash
   git switch -c workshop/fix-free-shipping
   git add src/shipping.js
   git commit -m "Fix free shipping at the threshold"
   git push -u origin workshop/fix-free-shipping
   ```

6. On GitHub, open the **Actions** tab and select the `CI/CD workshop` run. Notice that the CI and build jobs are green. On this branch the delivery job is marked as skipped; deployment is reserved for `main`.
7. Open a pull request, review the green checks, and merge it into `main`. The workflow triggered by the merge runs all three stages. Open the last job to see the deployment simulation and download `workshop-build` from the run summary if you want to inspect the artifact.

## Project layout

```text
.github/workflows/ci.yml   GitHub Actions pipeline
src/shipping.js            Application code with the intentional bug
test/shipping.test.js      Automated tests that expose the bug
scripts/build.mjs          Creates the build artifact
```
