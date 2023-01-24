package com;

import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.function.Consumer;

@Service
public class Reader {

    @SneakyThrows
    public void start(Consumer<String> onReadLine) {
//        ProcessBuilder processBuilder = new ProcessBuilder("/bin/bash", "-c", "tail -f -n 10000 /home/sherbel/Downloads/aic-cart-state-machine.log");
        //first install sshpass, then add intellij environment viriable SSHPAS=paswword
        ProcessBuilder processBuilder = new ProcessBuilder("/bin/sh", "-c", "sshpass -e ssh tracxpoint@master-cart8 -C 'tail -f -n 10000 /opt/tracxpoint/cart-state-machine/logs/aic-cart-state-machine.log'");
//        processBuilder.inheritIO();
        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
            onReadLine.accept(line);
        }
    }
}
