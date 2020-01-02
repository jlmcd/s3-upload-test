This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Amazon S3 Upload Component

This project is a demonstration of the moving parts while uploading files to a storage solution such as Amazon's S3.

### Setup

Create this `.env` file, filling in the missing data with your own AWS 
```
SERVER_PORT = 4000
BUCKET = <YOUR BUCKET NAME>
AWS_ACCESS_KEY_ID = <YOUR AWS ACCESS KEY ID>
AWS_SECRET_ACCESS_KEY = <YOUR AWS SECRET ACCESS KEY>
```

#### Account
If you haven't already signed up for an amazon S3 account, you can do so [here](https://portal.aws.amazon.com/billing/signup). S3 does cost money so you will need to input a credit card. However, AWS offers 12-months of free tier service as long as you don't exceed your limits. See details [here](https://aws.amazon.com/free/).
Once your account is set up, go to https://console.aws.amazon.com and log in.

##### Create A New User and Generate Access Keys
1. Once you are on the home page, type 'IAM' in the search box and click on the link to IAM in the search results.
2. It is highly recommended by AWS that you delete your root access keys since they provide complete control over all AWS products and instead create a new IAM user with access restricted to only to specific products. In our case, we want to create a user with restricted access to S3.
   * Click delete your root access keys, then manage security credentials, then continue to security credentials
   * In the actions column, click delete, then yes to the confirmation box.

