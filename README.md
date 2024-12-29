# ALma

Immigration made easy.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Developers

Clone the repo to your local machine:

```
git clone https://github.com/yusufalp/immigration.git
```

First, install the necessary libraries:

```bash
npm install
# or
yarn add
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
```

Lastly, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Users

When you go to the home page, you will be welcomed by two options: "Get Started" or "Admin Login".

If you are looking for help and want to use our services please select "Get Started" and completed the form on the next page. A representative will contact you shortly after.

If you are an admin, select "Admin Login". Use the credentials below to login and see the leads.

**Credentials**

- _username_: admin
- _password_: password

Note admin: The leads are saved in-memory, which means if you have to re-start the server, the data will be lost.

## Design Choices

- On the home page, we have two options to be chosen: one for the user and one for the admin. Since we needed an authentication process in place, this is a great place to start that. Admins are required to login to see the leads submitted while the users are not required to submit the leads.

- When collecting information about the leads, we needed several information including a resume file. There was no option in the mockup design but this is a great place to ask for that information for easier user experience.

- Resume files are processed by a separate API than the rest of the information. Once a lead is submitted successfully, there will be a new folder named "uploads" will be created in the root folder. This folder will contain the uploaded files.

- There were no image or other types of files provided so I choose a similar option that was available online. These include the cover page of alma for the form, svg files for little icons in the form itself and in the confirmation page, and the logo in the sidebar in the dashboard when admin logs in.

- The style is consistent throughout all the pages. Similar elements have similar styles (i.e. buttons on each page are styled the same)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
