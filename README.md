# Outsmart Digital Template React Web

This project is a template for Outsmart Digital projects that use React for web development.
It can be used for both SPAs (single page applications) and SSR (server side rendered) applications.
It is built on top of [Next.js](https://nextjs.org/) project and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## SSR vs SSG: which to choose?

This repo provides two options to host/deploy your website: SSR and SSG using NextJS.
Our [documentation](https://docs.outsmartyourself.com.br/en/dev/frontend/web/ssr-svg-spa-at-outsmart)
explains some use cases for each of the options. Below we explain how to change the configurations
for each strategy.

## SSR

### Configuring

1. Serverless.yml
   Make sure you have the serverless.yml file. This file only exists for the SSR strategy,
   no changes needed.

2. CircleCI Config
   The contents of `./.circleci/config.yml should be equal to ./.circleci/config.ssr.yml`.
   Delete `./.circleci/config.ssg.yml`.

3. Infrastructure
   You need one s3 bucket to host terraform state data. Put the bucket's, and the project's name
   in the
   `infrastructure/{env}/_backend.tf` file. If for a given environment the deployment is
   in Outsmart's infrastructure, just use our default bucket: terraform-outsmart, but
   change the `key` with the project's name and stage in this case too.
   For SSR, your infra should have:

- API Gateway for our server
- CloudFront to cache static assets
- S3 to host static assets
- S3 to host server-side code
  The `infrastructure/{env}` dir should look like this (delete other useless files)

```
- _backend.tf
- _outputs.tf
- _variables.tf
- ssr-api-gateway-webserver.tf
- ssr-cloudfront-static-assets.tf
- ssr-s3-server-deployment-bucket.tf
- ssr-s3-static-assets-bucket-tf
```

Change the variables in `infrastructure/{env}/_variables.tf`, remove the ones not
being used.

4. Package.json scripts
   Delete any script that contains `:ssg` in its name.

### First deploy

The first SSR deploy comes in two steps:

1. Deploy infrastructure with terraform.
2. Deploy serverless app
   For both you need AWS credentials exported in your terminal session.
   These steps are required for each environment deployed.

#### 1. Deploy Infrastructure with terraform

Make sure you previously setup the files correctly according to the steps in the
configuring section. Also, you will need to terraform (`tfenv` recommended).

```
terraform apply
```

Review the actions and type `yes` to apply. The first apply can take a while.
Get the output values printed in your terminal and fill the corresponding `.env` file.

#### 2. Deploy Serverless App

Simply run this command (`yarn install` required first). Change `dev` to your
environment if needed.

```
yarn deploy:dev:ssr
```

## SSG

### Configuring

1. Serverless.yml
   You can delete this file, it isn't used for SSG.

2. CircleCI Config
   The contents of `./.circleci/config.yml should be equal to ./.circleci/config.ssg.yml`.
   Delete `./.circleci/config.ssr.yml`.

3. Infrastructure
   You need one s3 bucket to host terraform state data. Put the bucket's, and the project's name
   in the
   `infrastructure/{env}/_backend.tf` file. If for a given environment the deployment is
   in Outsmart's infrastructure, just use our default bucket: `terraform-outsmart`, but
   change the `key` with the project's name and stage in this case too.
   For SSR, your infra should have:

- S3 with website config
- CloudFront to cache website
  The `infrastructure/{env}` dir should look like this (delete other useless files)

```
- _backend.tf
- _outputs.tf
- _variables.tf
- ssg-cloudfront-website.tf
- ssg-s3-deployment-bucket-tf
```

Change the variables in `infrastructure/{env}/_variables.tf`, remove the ones not
being used.

4. Package.json scripts
   Delete any script that contains `:ssr` in its name.

### First deploy

The first SSG deploy comes in two steps:

1. Deploy infrastructure with terraform.
2. Deploy S3 website assets
   For both you need AWS credentials exported in your terminal session.
   These steps are required for each environment deployed.

#### 1. Deploy Infrastructure with terraform

Make sure you previously setup the files correctly according to the steps in the
configuring section. Also, you will need to terraform (`tfenv` recommended).

```
terraform apply
```

Review the actions and type `yes` to apply. The first apply can take a while.
Get the output values printed in your terminal and fill the corresponding `.env` file.

#### 2. Deploy S3 website assets

Simply run this command (`yarn install` required first). Change `dev` to your
environment if needed.

```
yarn deploy:dev:ssg
```

## Routing

You can implement routing login in the `routes.js` file.
Remember to reference the correct route in your code:

```
app.get('/sobre', renderPage('about'))
```

For this to work you need `./pages/about.tsx`, but your navigations inside the app need
to reference `/sobre`.

```jsx
<Link href={'/about'} as={'/sobre'}>
  <a>Go To About Page</a>
</Link>
```

For ssg websites (which use the `next export` feature) you may need to
define a `exportPathMap` to your `next.config.js` if your project has
custom routes. Check out the [docs](https://nextjs.org/docs/api-reference/next.config.js/exportPathMap).
