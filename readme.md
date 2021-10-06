# E-Retail APP

This project was created with the help of [Material UI](https://material-ui.com/) according to this [specsheet](https://drive.google.com/file/d/1X7hsRMtT424uoah7sySdf0ATaszcvYnp/view?usp=sharing).

## FEATURES

The current Features are:

### `User SignUp and SignIn`

A Login and signup form where the user can create an account. Upon successful signup and signin a success or error message is shown.

### `Display the Products in a table with pagination`

Displays all the products added in the backend in the Home Page with pagination enabled

### `Filter and search the Displayed Data`

Users can apply filter (according to categories) or search the displayed data (Search as you go)

**Note: For the search query to work please remove all filters or select all from the filter list**

### `Add To Cart`

Users can add the product they like to their cart . The badge shown is automatically incremented when a new product is added or the quantity increased when the same product is selected more than once.

**Note: You can add products even when you are not signed in**

### `The Cart Drawer`

Users can click on the cart icon to open the cart drawer where users can either change the product quantity or remove the item from the cart entirely. Users are also shown a bill amount which changes dynamically as the user changes the item quantity or removes an item.

### `Place Order`

**Note: User has to be signed in to use this feature**

After user has added products inside the cart they can click on place order and a payment page using [braintree](https://developers.braintreepayments.com/start/overview) is displayed where users can enter the payment details and click Buy Now. Upon successfuly placing an order a success message is shown.

**Note: Use Card `4111 1111 1111 1111` for testing purpose**

### `Orders Page`

**Note: User has to be signed in to use this feature**

After user has successfuly placed their order. User can view their order history through the orders page.

## Known Bugs and Improvement Required

These are some of the bugs users may face while placing the order

### The Payment page not loading

This is a braintree bug [StackOverflow Link](https://stackoverflow.com/questions/68526912/braintree-client-token-generate-method-throws-an-xml-error-inside-django) due to which the Card Payment modal sometimes fails to load and only buy now and cancel buttons are visible

**Note: This issue is now resolved**

### Cart Items are not stored when user signs out and then signs in after a period of time

As the Cart Items are currently stored in localStorage and not in the database they are not stored per user account . So it might be removed if the user signs out and signs back in again.

### Menu Item pops up again after clicking signout

After clicking signout , Menu item showing SignIn and SignUp are open for a brief time

### Cart Drawer has to be closed and opened again after an unsuccessful payment

After the payment has failed . The braintree dropin payment component does not open when clicking place order again. It works when closing the drawer and opening again

### Style Improvements

Some style improvements need to be added.

### Performance Improvements

Performance improvements are required
