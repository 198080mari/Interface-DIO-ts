import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { IoMdPerson } from "react-icons/io";
import { MdEmail, MdLock } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { api } from '../../services/api';
import { Column, Container, SubtitleLogin, Title, TitleLogin, Wrapper, TermosText, Row, ContaText, LoginText } from './styles';
import { IFormData } from '../cadastro/types';

const baseUrl = 'http://localhost:3000';

const schema = yup.object({
    name: yup.string().min(3,'Mínimo de 3 caracteres').required('Campo obrigatório'),
    email: yup.string().email('O e-mail não é válido').required('Campo obrigatório'),
    password: yup.string().min(3, 'Mínimo de 3 caracteres').required('Campo obrigatório'),  
  }).required();

  const Cadastro = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver:yupResolver(schema),
        mode: 'onChange',  //valida assim que usuario digitar
    });
      const onSubmit = async (formData: IFormData) => { //sync e await para esperar resposta pq a api pode demorar
        try {
            const { data } = await api.get(`${baseUrl}/users?name=${formData.name}&email=${formData.email}&senha=${formData.password}`);
            if(data.length === 1) {
                navigate('/feed')
            } else {
                alert('Email ou senha invádido')
            }
        } catch {
            alert('Ocorreu um erro, tente novamente.')
        }
      };
      return ( <>  
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                     e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                    <TitleLogin>Comece agora grátis</TitleLogin>
                    <SubtitleLogin>Crie sua conta e make the change.</SubtitleLogin>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input name='name' errorMessage={errors?.name?.message} control={control} placeholder='Nome completo' leftIcon={<IoMdPerson />}/>
                        <Input name='email' errorMessage={errors?.email?.message} control={control} placeholder='E-mail' leftIcon={<MdEmail />}/>
                        <Input name='password' control={control}  errorMessage={errors?.password?.message} placeholder='Senha' type='password' leftIcon={<MdLock />}/>
                        <Button title='Criar minha conta' variant='secondary' type='submit' />
                    </form>
                        <TermosText>Ao clicar em "criar minha conta grátis", declaro que aceito as políticas de privacidade e os termos de uso da DIO.</TermosText>
                        <Row>
                        <ContaText>Já tenho conta.</ContaText><LoginText>Fazer login</LoginText>
                        </Row>
                </Wrapper>
            </Column>
        </Container>
        </>)  //brackets fechadas pq tem 2 componentes ao lado do outro
    }
    export { Cadastro };

