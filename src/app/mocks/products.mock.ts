import { NodeTree } from "../models/movies.model";

export const products = [
    {
      name: 'Phone XL',
      price: 799,
      description: 'A large phone with one of the best screens'
    },
    {
      name: 'Phone Mini',
      price: 699,
      description: 'A great phone with one of the best cameras'
    },
    {
      name: 'Phone Standard',
      price: 299,
      description: ''
    }
  ];

  export const VERSIONS: NodeTree[] = [
      {
        nodeName: 'PRUEBA 1',
        id: 1,
        icon: 'assignment_returned',
        parentId: 1
      },
      {
        nodeName: 'PRUEBA 2',
        id: 2,
        icon: 'assignment_returned',
        parentId: 1
      },
    ];