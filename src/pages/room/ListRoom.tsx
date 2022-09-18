import { Row } from 'antd';
import { useEffect, useState } from 'react';
import { getRooms } from '~/api/room.api';
import CardItem from '~/components/card';
import { RoomType } from '~/types/RoomType';
export interface Props {
    motelId: string;
}

const ListRoom = ({ motelId }: Props) => {
    const [rooms, setRooms] = useState<RoomType[]>([]);
    useEffect(() => {
        const Room = async () => {
            const { data } = await getRooms(motelId);

            setRooms(data.rooms);
        };
        Room();
    }, []);
    return (
        <div>
            <Row>
                {' '}
                {rooms &&
                    rooms.map((item, index) => {
                        return (
                            <CardItem
                                key={index}
                                roomName={item.name}
                            ></CardItem>
                        );
                    })}
            </Row>
        </div>
    );
};

export default ListRoom;
