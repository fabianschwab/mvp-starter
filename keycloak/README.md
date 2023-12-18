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
3. Go to te **Credentials** tab
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
