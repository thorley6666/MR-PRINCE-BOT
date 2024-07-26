FROM quay.io/princemd/princebhay:latest

RUN git clone https://github.com/PRINCE-GDS/MR-PRINCE-BOT /root/prince

WORKDIR /root/prince/

RUN npm install --platform=linuxmusl

EXPOSE 5000

CMD ["npm", "start"]
