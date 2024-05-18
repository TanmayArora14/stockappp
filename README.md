Connect GitHub Repository:
    After logging in, go to your Render dashboard.
    Click on the "New" button and select either "Web Service" for backend services or "Static Site" for frontend static websites.
    Click "Connect account" to link your GitHub account to Render.
    Authorize Render to access your GitHub repositories.

Deploy a Web Service:
    Select Repository:
        Choose the repository containing your web service.
    Configure Settings:
        Fill in the service name and the root directory if your service is not in the repository root.
        Choose the environment (e.g., Node, Python, Ruby, etc.).
        Specify the build and start commands:
            For example, for a Node.js app:
            Build Command: npm install
            Start Command: npm start

        Select the region closest to your users for better performance.
    Deploy:
        Click on "Create Web Service." Render will start the deployment process.
    Monitor Deployment:
        Once deployed, Render provides a URL where your service is accessible.

Deploy a Static Site:
    Select Repository:
        Choose the repository containing  static site.
    Configure Settings:
        Fill in the site name and the root directory if your static site is not in the repository root.
        Specify the build command and publish directory:
            For example, for a static site using React:

            plaintext

        Build Command: npm run build
        Publish Directory: build

Deploy:
    Click on "Create Static Site." Render will start the deployment process.

Monitor Deployment:
    Once deployed, Render provides a URL where your static site is accessible.

Example:
       Create Web Service:
      Fill in the details:
         Name: my-node-app
         Root Directory: (leave empty if at the root)
         Environment: Node
         Build Command: npm install
         Start Command: npm start
      Click "Create Web Service."

      Create Static Site:
    Fill in the details:
        Name: my-react-site
        Build Command: npm run build
        Publish Directory: build
        Start Command: npm start
