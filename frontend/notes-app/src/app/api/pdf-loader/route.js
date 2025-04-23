import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
const pdfurl = 'http://localhost:5000/uploads/1744599354533-Android.pdf';
export async function GET(req) {

    const res = await fetch(pdfurl);
    const data = await res.blob();
    const loader = new WebPDFLoader(data);
    const doc = await loader.load();

    let pdfText = '';
    docs.forEach((doc)=>{
        pdfText = pdfText + doc.pageContent + " ";
    })

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 10,
        chunkOverlap: 1,
    });
    const output = await splitter.createDocuments([pdfText]);

    let splitterList = [];
    output.forEach((doc)=>{
        splitterList.push(doc.pageContent)
    })


    return NextResponse.json({result: splitterList})
}