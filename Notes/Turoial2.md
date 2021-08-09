### Crud with ionic
We will create CRUD in ionic. For CRUD, you need four pages as follow:
1. List : Show list of items
2. Show : show item details
3. Create : Create new item
4. Update : update an item

You don't need a delete page beacuse delete can be simplifed using pop up.

Run these commands to create the pages that we need them
```
    # list item page
    ionic generate page items

    # show a single item page
    ionic generate page item
    
    # update an item
    ionic generate page edit-item

    # Create item page
    ionic generate page create-item
```