import React from "react";

const UsersTable = () => {
  const users = [
    {
      username: "JohnDoe",
      email: "john@example.com",
      inventory: [
        {
          product: { name: "Product 1" },
          quantity: 3,
          status: "OWNED",
        },
      ],
    },
  ];

  return (
    <div>
      <h1>Users and Their Products</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            user.inventory.map((item, index) => (
              <tr key={`${user.username}-${index}`}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>{item.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
