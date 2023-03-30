import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersData } from "../features/users/usersSlice";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";

function Users() {
    const users = useSelector((state) => state.users.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsersData());
    }, []);

    const renderList = () => {
        return users.map((user) => {
            return (
                <Tr>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.password}</Td>
                </Tr>
            );
        });
    };

    return (
        <div className="border-2 border-solid mx-32 my-9 p-6 rounded-md">
            <TableContainer>
                <Table variant="striped" colorScheme="blue">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Password</Th>
                        </Tr>
                    </Thead>
                    {/* <Tbody>{renderList()}</Tbody> */}
                </Table>
            </TableContainer>
        </div>
    );
}

export default Users;