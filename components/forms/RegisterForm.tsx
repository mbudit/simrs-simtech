"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"


const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };

      const user = await createUser(userData);

      if (user) router.push(`/patients/${user.$id}/register`)
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Silahkan daftarkan dirimu!</h1>
          <h2 className="text-dark-700">Isi kredensial anda dalam field dibawah ini</h2>
        </section>

        <section className="mb-12 space-y-6">
          <div className="mb-9 space-y-1">

          </div>
          <p className="sub-header">Informasi Pribadi</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          label="Nama Lengkap"
          name="nama"
          placeholder="Budi Triono"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="E-mail"
            placeholder="johndoe@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="hp"
            label="Nomor Handphone"
            placeholder="+620812345678"
          />
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="tanggallahir"
            label="Tanggal lahir"
            placeholder="johndoe@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Jenis kelamin"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between" onValueChange={field.onChange} defaultValue={field.value}>
                  {GenderOptions.map((option) =>
                  (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                    </div>
                  )
                  )}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="alamat"
            label="Alamat"
            placeholder="Perumahan Mutiara..."
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="Pekerjaan"
            label="Pekerjaan"
            placeholder="Karyawan Swasta"
          />
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="namakontakdarurat"
            label="Nama kontak darurat"
            placeholder="Asede"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="nohpkontakdarurat"
            label="Nomor kontak darurat"
            placeholder="+620812345678"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">
              Informasi Medis
            </h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary Physician"
          placeholder="Pilih dokter gan"
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt={doctor.name}
                  className="rounded-full border border-dark-500"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}

        </CustomFormField>

        <div className="flex flex-col gap-5 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="asuransi"
            label="Asuransi"
            placeholder="Prudential"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="noasuransi"
            label="Nomor asuransi"
            placeholder="123456789..."
          />
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="alergi"
            label="Alergi (apabila ada)"
            placeholder="Kacang, pollen, debu..."
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="obatSekarang"
            label="Current Medication (apabila ada)"
            placeholder="Ibuprofren 500gr, Paracetamol 500gr"
          />
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="riwayatMedisKeluarga"
            label="Riwayat medis keluarga pasien"
            placeholder="Ibu sakit diabetes, bapak sakit diabetes"
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="riwayatMedisPasien"
            label="Riwayat medis pasien"
            placeholder="typhus, thypoid"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">
              Identifikasi dan Verifikasi
            </h2>
          </div>
        </section>

        <div className="flex flex-col gap-5 xl:flex-row">
        </div>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm