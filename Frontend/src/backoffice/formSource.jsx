export const userInputs = [
    {
      id: 1,
      label: "Username",
      type: "text",
      placeholder: "john_doe",
    },
    {
      id: 2,
      label: "Name and surname",
      type: "text",
      placeholder: "John Doe",
    },
    {
      id: 3,
      label: "Email",
      type: "mail",
      placeholder: "john_doe@gmail.com",
    },
    {
      id: 4,
      label: "Phone",
      type: "text",
      placeholder: "+1 234 567 89",
    },
    {
      id: 5,
      label: "Password",
      type: "password",
    },
    {
      id: 6,
      label: "Address",
      type: "text",
      placeholder: "Elton St. 216 NewYork",
    },
    {
      id: 7,
      label: "Country",
      type: "text",
      placeholder: "USA",
    },
  ];
  
  export const productInputs = [
    {
      id: 1,
      label: "Title",
      type: "text",
      placeholder: "Apple Macbook Pro",     
    },
    {
      id: 2,
      label: "Description",
      type: "text",
      placeholder: "Description",
    },
    {
      id: 3,
      label: "Category",
      type: "text",
      placeholder: "Computers",
    },
    {
      id: 4,
      label: "Price",
      type: "text",
      placeholder: "100",
    },
    {
      id: 5,
      label: "Stock",
      type: "text",
      placeholder: "in stock",
    },
  ];

  export const formOffer=[
    {
      id: 1,
      label: "Title",
      type: "text",
      placeholder: "Software Engineer",

      name:"title"
    },{
      id: 2,                      
      label: "Description",
      type: "text",
      placeholder: "Description",
      
      name:"description"
    },
    {
      id: 3,
      label: "company",
      type: "text",
      placeholder: "Esprit",
      
      name:"company"
    },
    {
      id: 4,
      label:"location",
      type : "text",
      placeholder:"tunis",
      name:"location"
    },
    {
      id:5,
      label:"requirements",
      type :"string",
      placeholder:"ci/cd",
      isArray: true,
      name:"requirements"
    },
    {
      id:6,
      label:"startDate",
      type : "Date",
      name:"startDate"
    },
    {
      id: 7,
      label: "Type",
      type: "select",
      options: ["Emploi", "Stage"],
      placeholder: "Sélectionnez le type",
      name:"type"
    }
  ]
  