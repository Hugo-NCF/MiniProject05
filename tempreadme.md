# mini-project-05-react-router-and-authentication

## Spring 2026

### Topic: SPA, React-Router and Authentication

---

## Objective:

As part of the last mini-project, we are going to implement an **SPA (Single Page Application)** with React Router and then add some Authentication mechanism to it.

- Before starting the project, we need to go over some basics.

---

## Topic 1: SPA (Single Page Application)

A Single-Page Application (SPA) is an application or web tool that interacts with the user by dynamically rewriting the current page rather than loading entire new pages from a server.

- How it works?
  - **Initial Load:** The browser loads a single HTML file initially.

  - **Dynamic Updates:** When the user clicks a link or button, only the specific data or components they need are fetched (usually via JSON).

  - **Fluid Feel:** Because the browser doesn't do a full refresh (blink/white screen), it feels like a desktop or mobile app.

- Advantages?
  - **Speed:** After the initial load, navigation is nearly instant because the heavy lifting (CSS/JS) is already done.

  - **Better UX:** Smooth transitions and animations are easier to implement without page reloads.

  - **Reduced Server Load:** The server sends small chunks of data instead of rendering full HTML pages every time.

  - **Offline Support:** Many SPAs can cache data efficiently to work with poor internet connections.

- Common Applications:
  - **High Interactivity:** Use it for complex tools like Gmail, Google Maps, or Trello.

  - **Social Platforms:** Ideal for feeds where users stay on the page for a long time (e.g., Facebook, X).

  - **SaaS Products:** Great for dashboards and internal business tools. [Note: Software as a Service (SaaS) is a cloud-based model where software is accessed via a web browser on a subscription basis, rather than being installed locally. Providers manage infrastructure, security, and updates, reducing IT burdens. Key benefits include lower initial costs, automatic updates, and high accessibility, while drawbacks include potential security risks, dependency on internet connectivity, and limited customization.].

- When to avoid it?
  - **SEO (Search Engine Optimization) is a Priority:** Traditional "Multi-Page Applications" (MPA) are often easier for search engines to crawl (though modern SPAs have workarounds).

  - **Content-Heavy Sites:** Blogs or news sites where users land on one page, read, and leave don't benefit much from the SPA overhead.

## Topic 2: Client Side Rendering (CSR)

- For web applications, **page rendering** means how your web app turns code and data into visible HTML for the user. There are several ways to do this, and modern web apps usually mix them instead of using just one.

- Some of the most commong page rendering methods are:
  - Client-Side Rendering (CSR)
  - Server-Side Rendering (SSR)
  - Static Site Generation (SSG)
  - Incremental Static Regeneration (ISR)
  - Streaming / Partial Rendering (modern)

- For this class, we will only cover CSR.

- CSR is a web development method where the browser downloads a minimal HTML page and uses JavaScript to render content directly on the user's device, rather than fetching fully formed pages from the server.
  - It enables highly interactive, app-like experiences (SPAs) by updating content dynamically without full page reloads, commonly using frameworks like React, Vue, or Angular.

  - Key Aspects of Client-Side Rendering:

  - **Process:** The server sends a barebones HTML file and JavaScript bundles. The browser then executes the JavaScript to build the document object model (DOM) and fetch data via APIs.

  - Advantages:
    - **User Experience:** Extremely fast and responsive after the initial load, as interactions don't require full page reloads.
    - **Reduced Server Load:** The browser handles rendering, reducing the workload on the server.
    - **Reactivity:** Ideal for complex, dynamic applications like social media feeds or dashboards.

  - Disadvantages:
    - **Initial Load Time:** The first page load can be slower because the browser must download and run JavaScript before displaying content.

    - **SEO Challenges:** Search engines may struggle to index content that is not rendered immediately, although this is improving.

    - **Performance Dependency:** The user's device speed and internet connection directly impact rendering time.

- Unlike **Server-Side Rendering (SSR)**, which sends fully formed HTML to the browser, CSR shifts this work to the client. CSR is preferred for interactive applications, while SSR is often better for static, content-heavy sites needing fast SEO (Search Engine Optimization) performance.

### Does React Support CSR or SSR or Both?

- **React uses Client-Side Rendering (CSR) by default**. That means the browser builds the UI using JavaScript, not the server.

#### Step-by-step: How React uses CSR

1. When the user opens your site, browser requests:

```javascript
GET / index.html;
```

2. Server responds with something like:

```javascript
<body>
  <div id="root"></div>
  <script src="bundle.js"></script>
</body>
```

Note: The HTML is basically empty (just a root div).

3. The browser downloads React JavaScript bundle.js which contains: React, Your components, Routing logic, API calls, etc.

4. React builds the UI in the browser by running:

```javascript
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

- React has the ability to do Server-Side Rendering, but:
  - plain React (Create React App / Vite React) runs as CSR only
  - To get SSR, you need a framework built on top of React
  - If you want to SSR with React, you need frameworks like Next.js, Remix, Gatsby, etc.

## Topic 3: React-Router

- **React Router** is the standard routing library for React apps.

- It lets your app have multiple pages (URLs) while still behaving like a single-page app (SPA) — no full page reloads.

- For the next part, code with Prof. Hamid:

* 1. Start a new project in React (using vite) + install and add Tailwind + DaisyUI

* 2. Delete unnecessary code from App.jsx and just have one line like Mini-Project-05. We will eventually use other components for the project.

* 3. Use the link below to get the information about react-router:
     https://reactrouter.com/home

* 4. Note that we will use the router in **data** mode. So you may choose the option and go to this link:
     https://reactrouter.com/start/data/installation

* Following the installation instructions, install `react-router` library to your project.

* 5. Now do the following:
  - a) Create three folders inside of `src`: `components`, `layouts`, `routes`.

  - b) In the `components` folder, declare several dummy/simple components like: `Home.jsx`, `AboutUs.jsx`, `Login.jsx`, `Header.jsx`, `Footer.jsx`. Add bare minimal code to each component. You may use a `NavBar` from **daisyUI** in the Header component and use a `footer` from daisyUI in the Footer component.

  - c) In the `layouts` folder, create a component called `Root.jsx` (it can be called anything) and define it like the following:

```javascript
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <div>
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
};

export default Root;
```

- Note that the `<Outlet />` component in React Router is a placeholder, used in parent route elements to render their matching child route components.

- d) In the `routes` folder, create a file called `MainRouter.js` and add the following lines:

```javascript
const MainRouter = [
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "/aboutus", Component: AboutUs },
      { path: "/login", Component: Login },
    ],
  },
];
export default MainRouter;
```

- Note that `MainRouter` is just an array of object (it no jsx component); it defines different paths and nested paths and the relevant components that should be used when the path is called. For example, if a user is trying to call the '/' (root path or web root), your app should render the `Home` component.

- e) Now, in the `main.jsx`, do the following:

```javascript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";

import MainRouter from "./Routes/MainRouter.js";

const router = createBrowserRouter(MainRouter);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
```

- Note that
  - `createBrowserRouter` is the recommended way to handle routing in all modern React Router web projects as it enables powerful features like `loaders`, `actions`, and `lazy loading`. It uses the browser's native History API to manage the URL and history stack.

  - the `RouterProvider` component (given by `react-router`) enables client-side routing and provides routing functionality to all components within your application. It is used in conjunction with a router object (`router`, in this case) created by functions like `createBrowserRouter`.

- f) Now, on the locally deployed app, check the pages by typing '/', '/login', 'signup', and '/aboutus'. You should notice that for all the pages, the header and footer remains the same (since they are rendered based on the definition of the Root layout).

- g) Now, we may use `NavLink` to store the links to the pages and update them in the `Header` component to make it respond accordingly.

```javascript
const navLinks = [
  <NavLink to="/">Home</NavLink>,
  <NavLink to="/aboutus">About Us</NavLink>,
  <NavLink to="/signup">SignUp</NavLink>,
  <NavLink to="/login">Login</NavLink>,
];
```

- You may find similar information and more details from https://reactrouter.com/start/data/routing source.

### Topic 4: Authentication \& Authorization

- **Authentication** verifies a user's identity (who they are) using credentials like passwords or biometrics, while **authorization** determines their permitted actions (what they can do) after logging in. Authentication always occurs first, followed by authorization to manage access levels, usually via tokens.

- Implementing these facilities/tools as part of a single project it too time consuming or infeasible. Hence, we will use some third party tools to integrate authentication to our system.

- **Okta** and **Firebase** are cloud-based platforms that help developers add backend features like user **authentication**, databases, and storage to apps without building them from scratch. Okta is an enterprise-focused Identity and Access Management (IAM) service specializing in secure login and single sign-on. Firebase is a comprehensive Google suite for mobile/web app development, providing faster, consumer-focused tools.

#### Create and Integrate a Firebase Project to our React App for providing Authentication:

- Open `https://console.firebase.google.com`, create a new project by following instructions. We may not need Google Analytics (optional), we will disable it.

- Once the project is built, from the project homepage, choose Build > Authentication > Signin Methods. Let's add two methods: Email/Password and Google SignIn.

- Check the `Users` option, currently there should be none.

- Go to Project Settings (Gear Icon) > Overview and scroll down to 'Your Apps' and try to connect one of the apps (in this case we use `</>` option). Give it a name and hit `Register App` button. You will get some sensitive configuration information. You may want to save it.

- Now, install `firebase` in the current React App (mini-project-05), add a file, like `firebase.config.js` and save the configuration data there.
  - Create a .env file and store the values of the config properties there, add the .env file to the .gitignore file

- **Authentication for Web**:
  - source: https://firebase.google.com/docs/auth/web/start?authuser=0
  - Use the examples/directions to complete the set up for a SignUp page.

- You may get the idea from here: https://firebase.google.com/docs/web/setup

- Follow what Prof. does and then do it yourself. Check if the navigation, links, and authentication is working properly.

### Self Teach:

- React Context API (crucial for managing global authentication state, securing routes, and centralizing authentication logic)
- Private Routing

## Mini Project 05 Problem Description:

- It is an extension of mini-project-04. You need to work with the same group of people as you did for mini-project-04.

- What do you do?
  - **Re-design** and **re-factor** your code from **mini-project-04** so it becomes an **SPA** with at least these pages:
  - **Home:** Create a landing page that provides some information (e.g., what kind of app this is, or a subset of available movie data). Upon first-time landing, the user should be treated as a **guest**.

  - **Signup:** Provide a way for users to sign up for an account; keep at least two options: username/password and one via a social media account (Google, X, ...). Use **Firebase** or another third-party authentication tool.

  - **Login:** Have a way so signed-up users can log in with credentials. Please make sure to include "view password (closed eye/open eye)" and the "change password" button.

  - **Guest vs Authenticated User:** A guest user is supposed to be able to get a sense of what your app is about (find a few movies, but not all), with limited interactions (no like/dislike/watch list/filter, etc.). On the other hand, an authenticated user should have full access (view all data, filter, sort, like/dislike, download files). Always ensure that even an authenticated user cannot access your app's utilities unless they properly log in.

  - **Dashboard/Some page:** Have a way for users to view the full list of movies and perform operations (search, like/dislike/etc. (as per your designed system), if they have an account and have logged in.
  - **Error Pages:** Create at least 2 possible error pages:
    - If the user tries a wrong link/url (/logging instead of /login), redirect them to a **404 page (page not found)**. Make sure there is a way (e.g., a button) for the user to return to a valid landing page (home/login).
    - Implement **at least one other type of error page**, like:
      - **403 Forbidden:** The user does not have permission for the content, and authentication will not change this.
      - **401 Unauthorized:** The user must authenticate themselves to receive the requested response (missing or incorrect login credentials).
      - **400 Bad Request:** The server cannot process the request due to a client error (e.g., malformed syntax).

  - Maintain **consistent design styles**, pay attention to the **UI/UX**, and make sure the navbar can visibly show some information (**guest/logged-in user's profile image**, etc.), and the page navigation options (menu).

  - Before uploading the code, **hide the sensitive information (like your Firebase app's configuration details)**

  - There must be a way to **logout** and once logged out the user should be treated as a guest (cannot access pages like the dashboard)

  - Deploy and test the project.
  - Submit the **live link and the GitHub repo link**.
    - The **README** must include information about **your system** and the **names of your teammates**.

    - **System**: Talk about the **components, pages, and how the user interaction impacts the page navigation** (use UML to map user interaction-based page navigation or use State Machine Diagrams to show screen transitions or Activity Diagrams to model user flows.)

- Prepare a **10-minute presentation** for the next class to demonstrate the work and the system, and each member's contribution.

- **You and your teams will get a 0 if the links are not posted by 03/06 (10:00 AM) on Canvas.**

## Rubric:

- <u>[10 points]:</u> Deliver a formal class presentation.

- <u>[15 points]:</u> Clearly explain your system (UML/state diagram) and provide an informative README file.

- <u>[10 points]:</u> UI/UX: Ensure clear visuals to distinguish guests from authenticated users. Maintain navigation links between pages (back, logout, etc.).

- <u>[10 points]:</u> Home/Landing Page and Error Pages: Design a creative and visually appealing homepage necessary error pages.

- <u>[15 points]:</u> Authentication: Implement signup, login, and logout features.

- <u>[10 points]:</u> Provide at least two signup methods (username/password and one social media option). Include validations for usernames and passwords.

- <u>[10 points]:</u> Implement MainRoute and PrivateRoute (accessible only to authenticated users).

- <u>[10 points]:</u> Use a component-based implementation with logically separated components in individual files. Do not place all code in one .jsx file.

- <u>[10 points]:</u> Maintain a well-structured code directory (avoid putting everything in one folder). Follow consistent naming conventions.

## Reading Resources:

- https://softwaremind.com/blog/what-is-a-single-page-application-spa/

- https://www.geeksforgeeks.org/javascript/what-is-single-page-application/

- https://www.geeksforgeeks.org/computer-networks/difference-between-authentication-and-authorization/

- https://userfront.com/blog/auth-landscape

Sample Code Link: https://github.com/FahmidaHamid/mini-project-05-hamid
