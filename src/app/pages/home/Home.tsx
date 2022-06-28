import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  ListItem,
  Stack,
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

const PUBLISH_TODO_MUTATION = gql`
  mutation PublishTodo($id: ID!) {
    publishTodo(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

const UPDATE_TODO_MUTATION = gql`
  mutation UpdateTodo(
    $id: ID!
    $nome: String!
    $descricao: String!
    $status_todo: StatusTodo!
  ) {
    updateTodo(
      data: { nome: $nome, descricao: $descricao, status_todo: $status_todo }
      where: { id: $id }
    ) {
      id
    }
  }
`;

const DELETE_TODO_MUTATION = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(where: { id: $id }) {
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

type CreateTodoProps = {
  createTodo: {
    id: string;
  };
};

export const Home = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const { data } = useQuery<{ todos: TodoProps[] }>(GET_TODOS_QUERY);
  const todos = data?.todos;

  const [createTodo] = useMutation(CREATE_TODO_MUTATION);
  const [publishTodo] = useMutation(PUBLISH_TODO_MUTATION);
  const [deleteTodo] = useMutation(DELETE_TODO_MUTATION);
  const [updateTodo] = useMutation(UPDATE_TODO_MUTATION);

  const handleClickSave = () => {
    createTodo({
      variables: {
        nome: nome,
        descricao: descricao,
      },
      onCompleted(data) {
        publishTodo({
          variables: {
            id: data.createTodo.id,
          },
        });
      },
    }).then((res) => {
      setNome("");
      setDescricao("");
    });
  };

  function handleClickConcluirTodo(
    idTodo: string,
    nomeTodo: string,
    descricaoTodo: string,
    status_todo: string
  ): void {
    const new_status_todo = status_todo === "done" ? "undone" : "done";

    updateTodo({
      variables: {
        id: idTodo,
        nome: nomeTodo,
        descricao: descricaoTodo,
        status_todo: new_status_todo,
      },
      onCompleted(data) {
        publishTodo({
          variables: {
            id: data.updateTodo.id,
          },
        });
      },
    });
  }

  function handleClickDeletarTodo(idTodo: string): void {
    deleteTodo({
      variables: {
        id: idTodo,
      },
    });
  }

  return (
    <Box w={"90%"} h={"100%"} marginX={"auto"}>
      <Box h={"50%"}>
        <Text marginLeft={"10%"} fontWeight={"700"}>
          Todos
        </Text>
        {todos && (
          <UnorderedList>
            {todos.map((todo) => {
              return (
                <ListItem key={todo.id}>
                  <Stack direction={"row"} paddingY={"3px"}>
                    <Text>{todo.nome} - </Text>
                    <Text>{todo.descricao} - </Text>
                    <Text>
                      {todo.status_todo === "done" ? "Feito" : "Para fazer"}
                    </Text>
                    <Button
                      colorScheme={"blue"}
                      size={"sm"}
                      onClick={() =>
                        handleClickConcluirTodo(
                          todo.id,
                          todo.nome,
                          todo.descricao,
                          todo.status_todo
                        )
                      }
                    >
                      Concluir
                    </Button>
                    <Button
                      colorScheme={"red"}
                      size={"sm"}
                      onClick={() => handleClickDeletarTodo(todo.id)}
                    >
                      Deletar
                    </Button>
                  </Stack>
                </ListItem>
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
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Descricão:</FormLabel>
          <Input
            type={"text"}
            id="descricao"
            value={descricao}
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
