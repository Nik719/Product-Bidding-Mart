const ghpages = require('gh-pages');

// Replace with your repository URL
const repoURL = 'https://github.com/your-username/your-repo.git';

ghpages.publish('dist', {
  branch: 'gh-pages',
  repo: repoURL
}, (err) => {
  if (err) {
    console.error('Deployment failed:', err);
  } else {
    console.log('Deployment successful!');
  }
});
