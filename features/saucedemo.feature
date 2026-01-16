Feature: SauceDemo – basic end‑to‑end flow

  Background:
    Given I open the saucedemo homepage

  # 1 Successful login & inventory page
  Scenario: Login with valid credentials shows the inventory list
    When I login with valid credentials
    Then I should see the inventory page
    And I should see at least one product listed

  # 2 Cart badge updates when adding/removing items
  Scenario: Adding an item increments the cart counter
    When I login with valid credentials
    And I add the first product to the cart
    Then the cart badge should show "1"

  Scenario: Removing an item clears the cart counter
  Given I open the saucedemo homepage
  And I login with valid credentials
  And I add the first product to the cart
  When I remove the same product from the cart
  Then the cart badge should be hidden



  # 3 Negative login
  @negative
  Scenario Outline: Login fails with invalid credentials
    When I login with username "<username>" and password "<password>"
    Then I should see an error message "<error>"

    Examples:
      | username      | password     | error                                                       |
      |               | secret_sauce | Epic sadface: Username is required                                        |
      | standard_user |              | Epic sadface: Password is required                                        |
      | wrong_user    | secret_sauce | Epic sadface: Username and password do not match any user in this service |
