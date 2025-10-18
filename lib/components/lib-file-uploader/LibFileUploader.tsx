"use client"
import {FC, useEffect, useRef, useState} from "react";
import CloudArrowUp from '@/assets/icons/cloud-arrow-up.svg'
import LibButton from "@/components/lib/lib-button/LibButton";
import convertFileSize from "@/utils/convert-file-size";
import Loading from "@/components/shared/loading/Loading";

export interface props {
    isLoading: boolean;
    onFileChange?: any;
}

const LibFileUploader: FC<props> = ({isLoading = true, onFileChange}) => {
    const labelRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (isLoading) {
            return;
        }
        setIsDragging(false);
        const file = e?.target?.files ? e?.target?.files[0] : e?.dataTransfer?.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };
    const onCancel = () => {
        setSelectedFile(null)
    }
    const onUpload = () => {
        onFileChange(selectedFile)
    }
    useEffect(() => {
        if(!isLoading) {
            setSelectedFile(null);
        }
    }, [isLoading])
    return (

        <div className="relative border border-dashed border-secondary-100/40 rounded-2xl overflow-hidden">
            <label
                ref={labelRef}
                className={`py-10 px-6 block ${isDragging ? 'border-secondary-100/100 bg-secondary-100/5' : ''}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="flex flex-col md:flex-row justify-center items-center gap-16">
                    <div className="flex gap-5 items-center flex-col md:flex-row">
                        <CloudArrowUp className="w-10 mt-2.5 shrink-0"/>
                        <div>
                            <p className="text-base font-bold">جهت انتخاب فایل کلیک کرده یا فایل مورد نظر را اینجا رها
                                کنید.</p>
                            <p className="text-sm text-secondary-100 mt-2">فایل‌های قابل انتخاب: PNG، JPEG، MP4</p>
                            <p className="text-sm text-secondary-100 mt-2">حداکثر حجم مجاز: 2 مگابایت</p>
                        </div>
                    </div>

                    <input type="file" accept="image/png, image/jpeg, image/jpg, video/mp4"
                           value=""
                           onChange={handleDrop} className="hidden"/>
                    <div className="sm:max-w-[120px] w-full">
                        <LibButton theme="btn-info-light" onClick={() => labelRef.current.click()} value="انتخاب فایل"/>
                    </div>

                </div>


            </label>
            {
                selectedFile && !isLoading ? (
                    <div className="absolute bg-light-100 top-0 right-0 w-full h-full flex items-center">
                        <div className="text-sm mx-auto w-full max-w-[250px]">
                            <p className="flex gap-1"><span className="text-secondary-100 shrink-0">نام فایل:</span>
                                <span
                                    className="inline-block ltr text-ellipsis overflow-hidden truncate">{selectedFile?.name}</span>
                            </p>
                            <p><span
                                className="text-secondary-100">حجم فایل:</span> {convertFileSize(selectedFile?.size)}
                            </p>
                            <div className="flex mt-4 gap-2">

                                <div className="grow">
                                    <LibButton value="انصراف" size="btn-sm" theme="btn-danger-light" onClick={onCancel}/>
                                </div>
                                <div className="grow">
                                    <LibButton value="تایید" size="btn-sm" theme="btn-success" onClick={onUpload}/>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : undefined
            }
            {
                selectedFile && isLoading ? (
                    <div className="absolute bg-light-100 top-0 right-0 w-full h-full flex items-center gap-3 justify-center">
                        <Loading size="w-6.5 h-6.5" /> <span>در حال بارگزاری...</span>
                    </div>
                ) : undefined
            }

        </div>
    );
};

export default LibFileUploader;