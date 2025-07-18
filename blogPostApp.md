# Blog Application - Documentation
is a web based application that can manage the blog post with a comment feature per blogs by the user to express there toughs in the posted blogs. 

## Credentials
- Admin User
    - email: "admin@mail.com"
    - password: "admin123"


## References

## Endpoints

### Users

#### [POST] - "/users/login"

- Sample Request Body

    ```json

    {
        "email": "sample@mail.com",
        "password": "samplePw123"
    }

    ```

#### [POST] - "/users/register"

- Sample Request Body

    ```json

    {
        "email": "sample@mail.com",
        "password": "samplePw123"
    }

    ```
      
### Blog Post

#### [POST] - "/blogposts/addBlogPost"

- Sample Request Body

    ```json

{
  "title": "Why MongoDB is a Game-Changer for Flexibility",
  "content": "MongoDB allows developers to break free from rigid schemas and embrace flexibility with JSON-like documents. It’s particularly powerful for agile projects, rapid prototyping, and applications that require horizontal scaling. NoSQL isn’t just a trend — it’s a smart solution for many modern challenges."
}


    ```

#### [GET] - "/blogposts/getAllBlogPost"

- No Request Body

#### [GET] - "/getBlogPost/:blogPostId"

- No Request Body

#### [PATCH] - "/updateBlogPost/:blogPostId"

- Sample Request Body

    ```json

{
  "title": "How to Stay Consistent in Writing Blog Posts",
  "content": "test update5"
  
}


    ```

#### [DELETE] - "/deleteBlogPost/:blogPostId"

- No Request Body

#### [POST] - "/addComment/:blogPostId"

- Sample Request Body

    ```json

{
    "comment": "Test Comment5 admin"
}   

    ```
#### [GET] - "/getAllComments/:blogPostId"

- No Request Body

#### [DELETE] - "/deleteComment/:commentId"

- No Request Body