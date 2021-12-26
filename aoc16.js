const input = `8A004A801A8002F478`;

const hexToBinTable = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111'
};

const convertHexToBin = s => s.split('').reduce((acc, char) => {
    return acc + hexToBinTable[char];
}, '');

const removeTrailingZeros = s => {
    const charList = s.split('');

    while (charList[charList.length - 1] === '0') {
        charList.pop();
    }

    return charList.join('');
}

const getPacketVersion = packet => {
    const version = packet.slice(0, 3);

    return parseInt(version, 2);
};

const getPacketTypeId = packet => {
    const typeId = packet.slice(3, 6);

    return parseInt(typeId, 2);
};

const getLengthTypeId = packet => {
    return +packet[6];
};

const getLengthOfFirstSubpacket = packet => {
    const length = packet.slice(7, 7 + 15);

    return parseInt(length, 2);
};

const getNumberOfPackets = packet => {
    const number = packet.slice(7, 7 + 11);

    return parseInt(number, 2);
};

const parseLiteral = literal => {
    const numberOfChars = parseInt(literal.length / 5);
    let result = '';

    for (let i = 0; i < numberOfChars; i++) {
        const number = literal.slice(5*i, 5*(i+1));
        result += number.slice(1);
    }

    return parseInt(result, 2);
};

const getNestedPackets = packet => {
    const typeId = getPacketTypeId(packet);

    if (typeId === 4) {
        return [null, null, null];
    } else {
        const lengthTypeId = getLengthTypeId(packet);

        if (lengthTypeId === 0) {
            const lengthOfFirstSubpacket = getLengthOfFirstSubpacket(packet);
            return [packet.slice(22), lengthOfFirstSubpacket, null];
        } else {
            const numberOfSubpackets = getNumberOfPackets(packet);
            return [packet.slice(18), null, numberOfSubpackets];
        }
    }
};

const packet = removeTrailingZeros(convertHexToBin('8A004A801A8002F478'));
console.log(getPacketVersion(packet));
const result = getNestedPackets(packet);
console.log(getPacketVersion(result[0]));
const result1 = getNestedPackets(result[0]);
console.log(getPacketVersion(result1[0]));
const result2 = getNestedPackets(result1[0]);
console.log(getPacketVersion(result2[0]));

const parseLengthSubpackets = () => {

};

const parseNumberSubpackets = () => {

};
