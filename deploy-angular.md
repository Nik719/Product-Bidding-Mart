# Deploy Angular Project on GitHub Pages

1. **Install Angular CLI if not already installed:**
   ```bash
   npm install -g @angular/cli
   ```

2. **Build your Angular project:**
   ```bash
   ng build --configuration production --base-href "https://<username>.github.io/<repository-name>/"
   ```

3. **Install `angular-cli-ghpages` package:**
   ```bash
   npm install -g angular-cli-ghpages
   ```

4. **Deploy to GitHub Pages:**
   ```bash
   npx angular-cli-ghpages --dir=dist/<project-name>
   ```

Replace `<username>` with your GitHub username, `<repository-name>` with the name of your repository, and `<project-name>` with the name of your Angular project.
