#!/bin/bash

# Função para verificar se uma porta está em uso
port_in_use() {
    sudo lsof -i :$1 >/dev/null 2>&1
}

# Função para matar processo usando o PID
kill_process_by_pid() {
    local pid=$1
    echo "Matando processo com PID $pid..."
    sudo kill $pid
    sleep 0.2
}

# Verificar e matar processos nas portas especificadas
check_and_kill() {
    for port in "$@"; do
        if port_in_use $port; then
            echo "A porta $port está em uso. Obtendo PID do processo..."
            pid=$(sudo lsof -t -i :$port)
            if [ -n "$pid" ]; then
                kill_process_by_pid $pid
            else
                echo "Não foi possível obter o PID do processo na porta $port."
            fi
        fi
    done
}

# Parando serviço do redis
sudo service redis-server stop

# Verificar e matar processos nas portas especificadas
check_and_kill 5432 6379 27017

# Iniciar o Docker Compose
docker-compose up -d --remove-orphans

echo "Iniciando o serviço do mosquitto... MQTT"
sudo systemctl start mosquitto
sudo systemctl enable mosquitto 
mosquitto -d
