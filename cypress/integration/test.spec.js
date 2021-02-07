import LoginPage from '../page.objects/login.page';
import {env} from '../page.objects/credentials.json';

describe('login user', () => {
    const loginPage = new LoginPage();

    beforeEach(() => {
        loginPage.navigate(env.urls.login);
    });

    it('should login the app with valid credentials', () => {
        loginPage.fillUsername(env.user.username);
        loginPage.fillPassword(env.user.password);
        loginPage.submit();
        cy.location('pathname', { timeout: 2000 }).should('eq', '/'); // set the right location
        cy.title().should('eq', 'Home');
    });

    it('should navigate to the next field after pressing tab', () => {
        loginPage.fillUsername(env.user.username);
        loginPage.usernameElement.tab()
        loginPage.passwordElement.should('have.focus')
    });

    it('should login the app with valid credentials and after pressing enter', () => {
        loginPage.fillUsername(env.user.username);
        loginPage.fillPassword(env.user.password);
        loginPage.passwordElement.focus().type('{enter}');

        cy.location('pathname', { timeout: 2000 }).should('eq', '/'); //  set the right location
        cy.title().should('eq', 'Home');
    });


    it('should show error invalid username', () => {
        loginPage.fillUsername(env.invalid_user.username);
        loginPage.fillPassword(env.user.password);
        loginPage.submit();
        loginPage.errorMessageElement.should('contain', 'No account found with that username.');
        
    });

    it('should show error invalid password', () => {
        loginPage.fillUsername(env.user.username);
        loginPage.fillPassword(env.invalid_user.password);
        loginPage.submit();

        loginPage.errorMessageElement.should('contain', 'Wrong password');
     });

    it('should show error email is required field', () => {
        loginPage.fillPassword(env.user.password);
        loginPage.submit();

        loginPage.errorMessageElement.should('contain', "Please enter username.");
   });

    it('should show error password is required field', () => {
        loginPage.fillUsername(env.user.username);
        loginPage.submit();

        loginPage.errorMessageElement.should('contain', "Please enter your password.");
     });

    it('should show error email field is too long', () => {
        loginPage.fillUsername('Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus,.');
        loginPage.fillPassword(env.user.password);
        loginPage.submit();

        loginPage.errorMessageElement.should('contain', "Maximum length of username field is 255 symbols ");
     });
});
