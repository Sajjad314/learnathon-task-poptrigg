"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import userPlaceHolde from "@/app/assets/user-01.png";
import PenIconSVG from "@/app/assets/Icon/PenIconSVG";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileValidationSchema } from "@/utils/ProfileValidationSchema";
import FlagIconSVG from "../assets/Icon/FlagIconSVG";
import EmailIconSVG from "../assets/Icon/EmailIconSVG";

interface UserProfileData {
  firstName: string;
  lastName: string;
  profileImage: Blob;
  email: string;
  phoneNumber: string;
  storeName: string;
  storeURL: string;
  userID: string;
}

const page = () => {
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserProfileData>({
    resolver: zodResolver(ProfileValidationSchema),
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let imgUrl = URL.createObjectURL(
      event.target.files?.length ? event.target.files[0] : new Blob()
    );

    if (event.target.files?.length) {
      setValue("profileImage", event.target.files[0]);
      setPreviewImg(imgUrl);
    }
  };

  const handlePenClick = () => {
    inputRef.current?.click(); // Open the file input dialog
  };

  const onSubmit: SubmitHandler<UserProfileData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="h-screen flex flex-col gap-6 m-6 mt-0 px-6 py-4 bg-white">
        <div className="flex flex-row gap-6">
          <div>
            <div className=" relative w-24 h-24 rounded-full bg-[#F8F7FF]">
              <Image
                src={previewImg || userPlaceHolde}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-full"
                height={previewImg ? 96 : 66}
                width={previewImg ? 96 : 66}
              />
              <div
                className="absolute bottom-0 right-0 rounded-full bg-[#E9F0FF] p-1 cursor-pointer"
                onClick={handlePenClick}
              >
                <PenIconSVG />
              </div>
              <input
                {...register("profileImage")}
                ref={inputRef}
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                disabled={!isEditable}
                onChange={handleImageUpload}
              />
            </div>
            {errors.profileImage && (
              <span className="text-red-500">
                {errors.profileImage.message?.toString()}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <p
              className={`$ text-3xl font-bold leading-9 tracking-normal text-left text-gray-900`}
            >
              Shoumya Rasheed
            </p>
            <p
              className={`text-base font-normal leading-6 tracking-normal text-left text-gray-600`}
            >
              shoumya@vivasoftltd.com
            </p>
          </div>
          <div className="ml-auto">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsEditable(true);
              }}
              className={`px-8 py-2 bg-[#A699F8] hover:bg-[#A699F8] rounded-[10px] text-sm leading-4 tracking-tighter text-white`}
            >
              Edit
            </Button>
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-6 w-full">
          <p
            className={` text-xl font-medium leading-6 tracking-normal text-left text-gray-900`}
          >
            Basic Information
          </p>
          <div className="flex flex-row gap-6">
            <div className="flex flex-col gap-1.5 w-1/2">
              <Label
                htmlFor="firstName"
                className={` text-sm font-semibold text-gray-900`}
              >
                First name <span className="text-[#DD4A00]">*</span>
              </Label>
              <Input
                type="text"
                id="firstName"
                {...register("firstName")}
                placeholder="First Name"
                disabled={!isEditable}
                className={` border-[0.5px] rounded-2 px-3.5 py-2.5 ${
                  errors.firstName ? "border-red-500" : "border-[#CBCBCB]"
                } `}
              />
              {errors.firstName && (
                <span className="text-red-500">
                  {errors.firstName.message?.toString()}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5 w-1/2">
              <Label
                htmlFor="lastName"
                className={` text-sm font-semibold text-gray-900`}
              >
                Last name <span className="text-[#DD4A00]">*</span>
              </Label>
              <Input
                type="text"
                id="lastName"
                {...register("lastName")}
                placeholder="Last Name"
                disabled={!isEditable}
                className={` border-[0.5px] rounded-2 px-3.5 py-2.5 ${
                  errors.lastName ? "border-red-500" : "border-[#CBCBCB]"
                } `}
              />
              {errors.lastName && (
                <span className="text-red-500">
                  {errors.lastName.message?.toString()}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-6 mb-2">
            <div className="flex flex-col gap-1.5 w-1/2">
              <Label
                htmlFor="email"
                className={` text-sm font-semibold text-gray-900`}
              >
                Email address<span className="text-[#DD4A00]">*</span>
              </Label>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <EmailIconSVG />
                </span>
                <Input
                  type="text"
                  id="email"
                  {...register("email")}
                  placeholder="Email"
                  disabled={!isEditable}
                  className={` border-[0.5px] rounded-2 px-3.5 py-2.5 pl-8 ${
                    errors.email ? "border-red-500" : "border-[#CBCBCB]"
                  } `}
                />
              </div>
              {errors.email && (
                <span className="text-red-500">
                  {errors.email.message?.toString()}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5 w-1/2">
              <Label
                htmlFor="phoneNumber"
                className={` text-sm font-semibold text-gray-900`}
              >
                Phone Number <span className="text-[#DD4A00]">*</span>
              </Label>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <FlagIconSVG />
                </span>
                <Input
                  type="text"
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  placeholder="Phone Number"
                  disabled={!isEditable}
                  className={` border-[0.5px] rounded-2 px-3.5 py-2.5 pl-[55px] ${
                    errors.phoneNumber ? "border-red-500" : "border-[#CBCBCB]"
                  } `}
                />
              </div>
              {errors.phoneNumber && (
                <span className="text-red-500">
                  {errors.phoneNumber.message?.toString()}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <p
            className={` text-xl font-medium leading-6 tracking-normal text-left text-gray-900`}
          >
            Store Related Information
          </p>
          <div className="flex flex-row gap-6">
            <div className="flex flex-col gap-1.5 w-1/2">
              <Label
                htmlFor="storeName"
                className={`text-sm font-semibold text-gray-900`}
              >
                Store Name
              </Label>
              <Input
                type="text"
                id="storeName"
                {...register("storeName")}
                placeholder="Store Name "
                disabled={!isEditable}
                className={` border-[0.5px] rounded-2 px-3.5 py-2.5 ${
                  errors.storeName ? "border-red-500" : "border-[#CBCBCB]"
                } `}
              />
              {errors.storeName && (
                <span className="text-red-500">
                  {errors.storeName.message?.toString()}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5 w-1/2">
              <Label
                htmlFor="storeURL"
                className={`text-sm font-semibold text-gray-900`}
              >
                Store URL
              </Label>
              <Input
                type="text"
                id="storeURL "
                {...register("storeURL")}
                placeholder="Store URL"
                disabled={!isEditable}
                className={` border-[0.5px] rounded-2 px-3.5 py-2.5 ${
                  errors.storeURL ? "border-red-500" : "border-[#CBCBCB]"
                } `}
              />
              {errors.storeURL && (
                <span className="text-red-500">
                  {errors.storeURL.message?.toString()}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-6 w-1/2 pr-2.5">
            <div className="flex flex-col gap-1.5 w-full">
              <Label
                htmlFor="userID"
                className={` text-sm font-semibold text-gray-900`}
              >
                User ID
              </Label>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <EmailIconSVG />
                </span>
                <Input
                  type="text"
                  id="userID"
                  {...register("userID")}
                  placeholder="User ID"
                  disabled={!isEditable}
                  className={` border-[0.5px] rounded-2 px-3.5 py-2.5 pl-8 focus-visible:ring-0 ${
                    errors.userID ? "border-red-500" : "border-[#CBCBCB]"
                  } `}
                />
              </div>
              {errors.userID && (
                <span className="text-red-500">
                  {errors.userID.message?.toString()}
                </span>
              )}
            </div>
          </div>
        </div>
        {isEditable && (
          <div className="flex flex-col gap-4 w-full">
            <hr />
            <div className="flex flex-row justify-end gap-3">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditable(false);
                }}
                className={` font-bold text-[16px] leading-4 text-white rounded-[10px] px-4 py-3 gap-2.5 bg-[#6B6E80] hover:bg-[#6B6E80]`}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={` font-bold text-[16px] leading-4 text-white rounded-[10px] px-4 py-3 gap-2.5 bg-[#A699F8] hover:bg-[#A699F8]`}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default page;
