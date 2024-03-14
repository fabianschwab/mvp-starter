# KeyCloak Docker

For a local KeyCloak instance run the following command from this directory:

```shell
# Start up
docker-compose up -d

# Shut down
docker-compose down
```

The local instance is than available under [localhost:8180](http://localhost:8180)

You can login using the default credentials passed as environment variables in the docker compose file.

```yaml
KEYCLOAK_ADMIN: admin
KEYCLOAK_ADMIN_PASSWORD: password
```

## Using the Demo Realm

1. To import the **DemoRealm** go to the realm dropdown and click **Create Realm**.
2. Click on **Browse...** in the **Resource file** section
3. Select the provided [demorealm.json](./demorealm.json) file.
4. Click **Create**

After the realm is created you can switch to it in the dropdown.

### Finalizing Demo Realm (.env) File

1. In the **DemoRealm** go to the **client**
2. Select the **DemoClient**
3. Go to the **Credentials** tab
4. In the **Client secret** section generate a new client secret and copy it to the **.env** file (*KEYCLOAK_CLIENT_SECRET*)
5. Also fill in the *KEYCLOAK_CLIENT_ID* (*demorealm*) into the **.env** file.
6. For the *KEYCLOAK_ISSUER* use *<http://localhost:8180/realms/DemoRealm>*

### Creating a User and Log In

Finally it is time to create a user with which we can login

1. Go to **User** on the side menu
2. Click on **Add User**
3. Provide a *Username*
   1. Nice to have for later in the UI is also provide a *First* , *Last Name* and *E-Mail* Address
   2. Check the E-Mail verified
4. Click on **Create**

Now you should be rediurected to the newly created user.

1. Go to **Credentials**
2. Click **Set Password**
3. Provide a password and *uncheck* the **Temporary Password**
4. Click **Save**

Start the SvelteKit application an log in.

### Creating an Administrator User for a Realm

1. Create the realm
   From the Master realm, create a new realm. Be sure to be in that new realm (select it in the list under master realm)
2. Create an admin role for the new created realm
   - In the menu (to the left side), under **Configure** main title, select **Roles**
   - In the Realm Roles tab, click on the button **Add Role** and give it a name (admin) and a description (realm admin role) and switch on the **Composite Role**
   - In the new revealed section (Composite Roles), type in the **client roles** field: `realm-management`, then select it.
   - Select all the available elements in that selection from **Available Roles**, click [Add selected] button.
   - /!\ This role is only available to this realm and will affect only users related to the realm.
3. Affect the admin role to a user
   - Still in the same realm, create or choose a user you want it to become the admin
   - Go to its **Role Mappings** tab, and send the Available Roles `admin` to Assigned Roles.

Try to login http://<keycloak-instance-url>/auth/admin/REALM_NAME/console (replace REALM_NAME with realm name in which you created the user)
and adjust permissions of this realm admin user (from another browser with the master admin account).
For example, the new admin realm user can delete role (that is not normal),
it can do many thing on their realm you don't want it to do explicitely... (I guess).
