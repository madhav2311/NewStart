const snippets=require('../models/snippets.js')

const createSnippet=(req,res)=>{
  const{title,content}=req.body

  if(!title||!content){
    return res.status(400).json({error:'Pls provide the proper json include title and content'})

  }
  const newSnippet={
    id:Date.now().toString(),
    title,
    content

  }
  snippets.push(newSnippet)
  return res.status(200).json({success:true,msg:'Added new Snippet',newSnippet})

}

const getAllSnippet=(req,res)=>{
  if(snippets){
    return res.status(200).json({message:'Here are the snippets',snippets})

  }
  else{
    return res.status(400).json({success:false,message:'No snippets are available in the server !'})
  }
}

  const getSnippetById=(req,res)=>{
    const id=req.params.id
    const snippet=snippets.find(item=>item.id===id)
    if(!snippet){
      return res.status(400).json({success:false,message:`Snippet of id ${id} not found try again`})
    }
    return res.status(200).json({success:true,message:'Heres the snippet',snippet})
  }

module.exports={createSnippet,getAllSnippet,getSnippetById}