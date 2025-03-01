const restaurantData = {
  "restaurants": [
    {
      "id": 1,
      "name": "The Gourmet Spot",
      "address": {
        "street": "123 Foodie Lane",
        "city": "Delhi",
        "state": "Delhi",
        "zipCode": "110001"
      },
      "phone": "+91-9876543210",
      "cuisine": "Italian",
      "rating": 4.5,
      "openingHours": {
        "Monday": "10:00 AM - 10:00 PM",
        "Tuesday": "10:00 AM - 10:00 PM",
        "Wednesday": "10:00 AM - 10:00 PM",
        "Thursday": "10:00 AM - 10:00 PM",
        "Friday": "10:00 AM - 11:00 PM",
        "Saturday": "10:00 AM - 11:00 PM",
        "Sunday": "12:00 PM - 10:00 PM"
      },
      "deliveryOptions": {
        "takeaway": true,
        "homeDelivery": true
      },
      "averagePricePerPerson": 500,
      "dishes": [
        {
          "name": "Margherita Pizza",
          "description": "Classic pizza with tomato, mozzarella, and fresh basil.",
          "price": 300
        },
        {
          "name": "Pasta Carbonara",
          "description": "Traditional Italian pasta with eggs, cheese, pancetta, and pepper.",
          "price": 350
        },
        {
          "name": "Tiramisu",
          "description": "Coffee-flavored Italian dessert with mascarpone cheese and cocoa.",
          "price": 200
        }
      ]
    },
    {
      "id": 2,
      "name": "Spice Delight",
      "address": {
        "street": "456 Curry Avenue",
        "city": "Mumbai",
        "state": "Maharashtra",
        "zipCode": "400001"
      },
      "phone": "+91-9123456789",
      "cuisine": "Indian",
      "rating": 4.8,
      "openingHours": {
        "Monday": "11:00 AM - 11:00 PM",
        "Tuesday": "11:00 AM - 11:00 PM",
        "Wednesday": "11:00 AM - 11:00 PM",
        "Thursday": "11:00 AM - 11:00 PM",
        "Friday": "11:00 AM - 12:00 AM",
        "Saturday": "11:00 AM - 12:00 AM",
        "Sunday": "Closed"
      },
      "deliveryOptions": {
        "takeaway": true,
        "homeDelivery": false
      },
      "averagePricePerPerson": 400,
      "dishes": [
        {
          "name": "Butter Chicken",
          "description": "Rich and creamy curry made with marinated chicken in a spiced tomato sauce.",
          "price": 250
        },
        {
          "name": "Biryani",
          "description": "Fragrant rice cooked with Indian spices and marinated meat.",
          "price": 300
        },
        {
          "name": "Gulab Jamun",
          "description": "Traditional Indian dessert made from milk solids and soaked in syrup.",
          "price": 100
        }
      ]
    },
    {
      "id": 3,
      "name": "Ocean Breeze",
      "address": {
        "street": "789 Beachside Rd",
        "city": "Goa",
        "state": "Goa",
        "zipCode": "403001"
      },
      "phone": "+91-9765432109",
      "cuisine": "Seafood",
      "rating": 4.7,
      "openingHours": {
        "Monday": "12:00 PM - 10:00 PM",
        "Tuesday": "12:00 PM - 10:00 PM",
        "Wednesday": "12:00 PM - 10:00 PM",
        "Thursday": "12:00 PM - 10:00 PM",
        "Friday": "12:00 PM - 11:00 PM",
        "Saturday": "12:00 PM - 11:00 PM",
        "Sunday": "12:00 PM - 10:00 PM"
      },
      "deliveryOptions": {
        "takeaway": false,
        "homeDelivery": true
      },
      "averagePricePerPerson": 600,
      "dishes": [
        {
          "name": "Grilled Lobster",
          "description": "Fresh lobster grilled to perfection with garlic butter.",
          "price": 800
        },
        {
          "name": "Fish Curry",
          "description": "Traditional Goan curry made with fresh fish, coconut milk, and spices.",
          "price": 400
        },
        {
          "name": "Prawn Balchão",
          "description": "Goan prawn dish cooked in a spicy and tangy tomato sauce.",
          "price": 450
        }
      ]
    }
  ]
};

// Export the data so it can be used in other files
export default restaurantData;
