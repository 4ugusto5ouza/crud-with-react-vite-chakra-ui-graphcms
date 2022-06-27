import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useState } from "react";

const GET_TODOS_QUERY = gql`
  query {
    todos {
      id
      nome
      descricao
      status_todo
    }
  }
`;

const CREATE_TODO_MUTATION = gql`
  mutation CreateTodo($nome: String!, $descricao: String!) {
    createTodo(
      data: { nome: $nome, descricao: $descricao, status_todo: undone }
    ) {
      id
    }
  }
`;

type TodoProps = {
  id: string;
  nome: string;
  descricao: string;
  status_todo: "done" | "undone";
};

export const Home = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const { data } = useQuery<{ todos: TodoProps[] }>(GET_TODOS_QUERY);
  const todos = data?.todos;
  console.log(todos);

  const [createTodo] = useMutation(CREATE_TODO_MUTATION);
  const handleClickSave = () => {
    console.log(`${nome} : ${descricao}`);
    createTodo({
      variables: {
        nome: nome,
        descricao: descricao,
      },
    });
  };

  return (
    <Box w={"90%"} h={"100%"} marginX={"auto"}>
      <Box h={"50%"}>
        <Text>Lista de Todos</Text>
        {todos && (
          <UnorderedList>
            {todos.map((todo) => {
              return (
                <ListItem key={todo.id}>{`${todo.nome} - ${todo.descricao} - ${
                  todo.status_todo === "done" ? "Feito" : "Para fazer"
                }`}</ListItem>
              );
            })}
          </UnorderedList>
        )}
      </Box>
      <Box w={"50%"}>
        <Text fontSize={"2xl"}>Cadastrar Todo</Text>
        <FormControl>
          <FormLabel>Nome:</FormLabel>
          <Input
            type={"text"}
            id="nome"
            onChange={(e) => setNome(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Descricão:</FormLabel>
          <Input
            type={"text"}
            id="descricao"
            onChange={(e) => setDescricao(e.target.value)}
          />
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={false}
          type="submit"
          onClick={handleClickSave}
        >
          Cadastrar
        </Button>
      </Box>
    </Box>
  );
};
