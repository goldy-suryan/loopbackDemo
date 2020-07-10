# Loopback Demo

#### To start the project
Execute `node .` in the terminal at the root of the project.

#### Create admin user on startup of application
Open `server/boot/script.js` and enter the credentials to the adminCredentials object.

#### Authorization or ACL
To modify acl for the models, head over to `common/models` **.json modify acl array to the bottom of the file/s.
or execute `lb acl` at the command line at the root of the project to update acl as desired. more info [here](https://loopback.io/doc/en/lb3/Controlling-data-access.html).

###### For cart and order
Only admin can view all the cart and order.
User can only create, remove, update, get its cart and order.

###### For product and category
User can only view the products and category.
Admin an add, remove, update and get the product and category.