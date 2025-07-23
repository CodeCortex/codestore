"use client"
import React, { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {prisma} from "@/lib/prisma";
import { redirect } from "next/navigation";
import * as actions from "@/actions"
const CreateSnippetPage = () => {

    const [fromStateData, xyz] = useActionState(actions.createSnippet, {message:""});




  return (
    <form action={xyz}>
      <div>
        <Label>Title</Label>
        <Input type="text" name="title" id="title" />
      </div>
      <div>
        <Label>Code</Label>
        <Textarea name="code" id="code" />
      </div>
      {fromStateData.message && <div className="p-2 bg-red-300 border-2 border-e-red-600 mt-2">{fromStateData.message}</div> }
      <Button type="submit" className="my-4" >New</Button>
    </form>
  );
};

export default CreateSnippetPage;
