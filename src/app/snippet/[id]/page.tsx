import React from 'react'
import {prisma} from "@/lib/prisma"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import * as actions from "@/actions"
import { notFound } from 'next/navigation';

const SnippetDetailPage = async({params}:{params:Promise<{id:string}>}) => {
  
  const id = parseInt((await params).id);

  await new Promise((res)=>setTimeout(() => {
    res(undefined);
  }, 2000));

  const snippet = await prisma.snippet.findUnique({
    where:{
      id,
    },
  });

  // if(!snippet) return <h1>Snippet not found</h1>
  if(!snippet) notFound()

  const deleteSnippetActions = actions.deleteSnippet.bind(null, snippet.id);


  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-xl'>{snippet?.title}</h1>
        <div className='flex items-center gap-2'>
         <Link href={`/snippet/${snippet.id}/edit`}><Button>Edit</Button></Link> 

         <form action={deleteSnippetActions}>
          <Button type='submit' variant={'destructive'}>Delete</Button>
         </form>
        </div>
      </div>
      <pre className='p-3 bg-gray-200 rounded border-gray-200'>
        <code>{snippet.code}</code>
      </pre>
        
      
    </div>
  )
}

export default SnippetDetailPage;

//generate static 
export const generateStaticParams= async()=>{
  const snippets= await prisma.snippet.findMany();

  return snippets.map((snippet)=>{
    return {id:snippet.id.toString()}
  })

}
