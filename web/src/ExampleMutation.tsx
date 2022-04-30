import React,  {useEffect} from 'react';
import { gql, useMutation, useQuery} from '@apollo/client';
// import { v4 as uuidv4 } from 'uuid';



export default function ExampleMuation() {

    const TEST_MUTATION=gql`
    mutation {
        testMutation(payload: "hello")
    }
    `;
   

    const [testMutation,{ data, loading, error }] = useMutation(TEST_MUTATION);

    useEffect(()=>{
        testMutation();
    },[])

    useEffect(() => {
      console.log(data);
    }, [data])



    // testMutation();

  
    if (loading) console.log(loading)
    if (error)  console.log(error);
  
    return (
      <div>
         <div>something</div>
      </div>
    );
  }