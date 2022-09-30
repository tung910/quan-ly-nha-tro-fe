import { Row } from 'antd';
import { useEffect, useState } from 'react';
import { getRooms, removeRoom } from '~/api/room.api';
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

            setRooms(data);
        };
        Room();
    }, []);
    const onRemove = async (id: string) => {
        const confirm = window.confirm('Bạn muốn xóa không?');
        if (confirm) {
            await removeRoom(id);
            setRooms(rooms.filter((item) => item._id !== id));
        }
    };

    return (
        <div>
            <Row>
                {rooms &&
                    rooms.map((item, index) => {
                        return (
                            <CardItem
                                key={index}
                                roomName={item.roomName}
                                idRoom={item._id}
                                roomRentID={item.roomRentID}
                                unitPrice={item.unitPrice}
                                isRent={item.isRent}
                                onRemoveMotel={() => onRemove(item._id)}
                                customerName={item.customerName}
                                maxPerson={item.maxPerson}
                            ></CardItem>
                        );
                    })}
            </Row>
        </div>
    );
};

export default ListRoom;
