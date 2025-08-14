"use client";
import React, { useState } from 'react';
import {  IKUpload } from 'imagekitio-next';
import { Loader2 } from 'lucide-react';
import { IKUploadResponse } from 'imagekitio-next/dist/types/components/IKUpload/props';


interface FileUpladProps {
    onSucess: (res: IKUploadResponse) => void;
    onProgress?: (progress: number) => void;
    fileTypes?: "image" | "video";
}



export default function FileUpload({
    onSuccess,
    onProgress,
    fileTypes = "image",
}: FileUpladProps){

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onError = (err : {message: string}) => {
    console.log("Error",err);
    setError(err.message);
    setUploading(false);
    };

    const handleSuccess = (response: IKUploadResponse) => {
        console.log("Success",response);
        setUploading(false);
        setError(null);
        onSuccess(response);
    };

    const handleSProgess = (evt: ProgressEvent) => {
        if (evt.lengthComputable && onProgress) {
            const percentComplete = (evt.loaded / evt.total) * 100;
            onProgress(Math.round(percentComplete));
        }
    };

    const handleStartUpload = () => {
        setUploading(true);
        setError(null);
    };

    const validateFile = (file: File) => {
        if (fileType === "video"){
            if (!file.type.startsWith("video/")) {
             setError("Only video files are allowed");
             return false;
        }
        if(fileTypes.size > 100 * 1024 * 1024){
        setError("File size exceeds 100MB limit");
        return false;
     }
    }else{
        const validTypes = ["image/jpeg", "image/png", "image/png"];
        if (!validTypes.includes(file.type)) {
            setError("Invalid file type. Only JPEG and PNG are allowed.");
            return false;
        }

        if(fileTypes.size > 5 * 1024 * 1024){
        setError("File size exceeds 5MB limit");
        return false;
        }
    }

    return false;
    };

    return (
        <div className='space-y-4'>

           <IKUpload
              fileName={fileType === "video" ? "video": "image"}
              onError={onError}
              onSuccess={handleSuccess}
              onUploadStart={handleStartUpload}
              onUploadProgress={handleSProgess}
              accept={fileType === "video" ? "video/*" : "image/*"}
              className="file-input file-input-bordered w-full"
              validateFile={validateFile}
              useUniqueFileName={true}
              folder={fileType === "video" ? "video/*" : "/images"}
              />
            
            {
                uploading && (
                    <div className="flex items-center gap-2 text-sm text-sm text-primary">
                        <Loader2 className="animate-spin w-4 h-4" />
                        <span>Uploading...</span>
                    </div>
                )
            }
            {
                error && (
                    <div className="text-error text-sm">
                        {error}
                    </div>
                )
            }
        </div>
    ); 
}