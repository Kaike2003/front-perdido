import React from 'react'
import Input from './Input'
import Button from './Button'
import { Formik, Form } from 'formik';
import { object, string, number, date } from 'yup';
import { api } from '../../../services/api/getToken';
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import SelectCurso from './SelectCurso';
import SelectClasse from './SelectClasse';
import SelectTipoUtilizador from './SelectTipoUtilizador'


export default function CriarContaEstudante() {

    const navigate = useNavigate()

    const SchemaCriarContaEstudante = object({
        nome: string().required("Nome é um campo obrigatório").min(3, "O nome deve ter pelo menos 3 caracteres").max(40, "O nome deve ter no máximo 40 caracteres"),
        classe: string().required("Classe é um campo obrigatório").min(3, "A class deve ter pelo menos 3 caracteres").max(20, "A classe deve ter no máximo 40 caracteres"),
        curso: string().required("Curso é um campo obrigatório").min(3, "O curso deve ter pelo menos 3 caracteres").max(20, "O curso deve ter no máximo 40 caracteres"),
        email: string().email().required("Email é um campo obrigatório"),
        telefone: number().min(111111111, "Telefone deve ser maior ou igual a 111111111").max(999999999, "O telefone deve ser menor ou igual a 999999999").required("Telefone é um campo obrigatório"),
        palavra_passe: string().required("Palavra passe é um campo obrigatório").min(4, "A palavra passe deve ter pelo menos 4 caracteres").max(40, "A palavra passe deve ter no máximo 40 caracteres"),
        data_nascimento: date().required("Data de nascimento é um campo obrigatório").max("2012-12-31", "Precisas ser maior de 18").min("1890-12-31")
    })


    return (
        <div className='bg-indigo-100 flex items-center justify-center h-screen'>

            <section className="w-[60%] p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h1 className="text-xl font-bold text-black capitalize dark:text-white">CRIAR CONTA</h1>

                <Formik
                    initialValues={{
                        nome: "",
                        email: "",
                        telefone: null,
                        classe: "",
                        curso: "",
                        data_nascimento: new Date(),
                        palavra_passe: "",
                        tipo_utilizador: "ESTUDANTE"
                    }}
                    validationSchema={SchemaCriarContaEstudante}
                    validateOnChange
                    onSubmit={async values => {

                        await api.post("/estudante/criar_estudante", {
                            nome: values.nome,
                            email: values.email,
                            curso: values.curso,
                            classe: values.classe,
                            telefone: Number(values.telefone),
                            palavra_passe: values.palavra_passe,
                            data_nascimento: new Date(values.data_nascimento),
                            tipo_utilizador: values.tipo_utilizador
                        }).then((sucesso) => {

                            toast.success(sucesso.data)

                            setTimeout(() => {

                                navigate("/suchen/estudante/autenticar_conta")


                            }, 2500)

                            return sucesso.data

                        }).catch((error) => {
                            console.log(error)
                            toast.error(error.response.data)
                            return error.response.data
                        })


                    }}
                >
                    {({ errors, touched, handleChange, handleBlur }) => (

                        <Form className="">

                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">

                                <Input
                                    id='nome'
                                    titulo_label='Nome'
                                    type='text'
                                    key={"nome"}
                                    onchange={handleChange("nome")}
                                    onblur={handleBlur("nome")}
                                    placeholder="Digite seu nome"
                                    touched={touched.nome}
                                    errors={errors.nome}
                                />

                                <Input
                                    id='email'
                                    titulo_label='Email'
                                    type='email'
                                    key={"email"}
                                    onchange={handleChange("email")}
                                    onblur={handleBlur("email")}
                                    placeholder="Exemplo@gmail.com"
                                    touched={touched.email}
                                    errors={errors.email}
                                />


                                <Input
                                    id='telefone'
                                    titulo_label='Telefone'
                                    type='number'
                                    key={"telefone"}
                                    onchange={handleChange("telefone")}
                                    onblur={handleBlur("telefone")}
                                    placeholder="Digite o seu número de telefone"
                                    touched={touched.telefone}
                                    errors={errors.telefone}
                                />

                                <Input
                                    id='data_nascimento'
                                    titulo_label='Date de nascimento'
                                    type='date'
                                    key={"data_nascimento"}
                                    onchange={handleChange("data_nascimento")}
                                    onblur={handleBlur("data_nascimento")}
                                    placeholder=""
                                    touched={touched.data_nascimento}
                                    errors={errors.data_nascimento}
                                />

                                <Input
                                    id='palavra_passe'
                                    titulo_label='Palavra passe'
                                    type='password'
                                    key={"palavra_passe"}
                                    onchange={handleChange("palavra_passe")}
                                    onblur={handleBlur("palavra_passe")}
                                    placeholder="Recomenda-mos uma senha forte"
                                    touched={touched.palavra_passe}
                                    errors={errors.palavra_passe}
                                />


                                <SelectCurso
                                    onchange={handleChange("curso")}
                                    onblur={handleBlur("curso")}
                                    touched={touched.curso}
                                    errors={errors.curso}
                                />

                                <SelectClasse
                                    onchange={handleChange("classe")}
                                    onblur={handleBlur("classe")}
                                    touched={touched.classe}
                                    errors={errors.classe}
                                />
                            </div>

                            <Button />


                        </Form>


                    )}
                </Formik >

                <form>

                </form>
            </section>



        </div>
    )
}

