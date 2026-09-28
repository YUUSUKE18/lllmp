import java.util.Scanner;
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNext()) return;

        String input = scanner.nextLine();
        int count = 0;
        long maxVal = Long.MIN_VALUE - 1L; // Start with a value smaller than possible min long
        
        try {
            boolean isEmptyInput = false;
            
            Scanner lineScanner = new Scanner(input, StandardCharsets.UTF_8.name());
            if (line.hasNextInt()) {
                int val = line.nextInt();
                
                while(line.hasNextLine() && !Character.isWhitespace((char) 0)){} // Check for more inputs
                
                String[] parts = input.split("[\\s,]+");
                
                for (String part : parts.trim().split("\\s*,\\s*")) {
                    if (!part.isEmpty()) {
                        try {
                            long valLong = Long.parseLong(part);
                            count++;
                            // Initialize maxVal with the first valid value or start with MIN_VALUE-1L and update
                            // However, since we might have only one element initially read (if using hasNextInt check above incorrectly)
                            // Better approach: process all tokens correctly
                
                } catch (NumberFormatException e){ 
                    continue; 
                }}

        long result = 0; 

            Scanner lineScanner2 = new Scanner(input);
            
        try {    
            boolean foundAny = false;
             while(line.hasNextInt()) {
                 int val = line.nextInt();
                 
     if (!foundAny) {
       maxVal = Math.max(maxVal, (long)val); // Initialize with first valid value if possible or MIN_VALUE - 1L 
        } else {    
            foundAny = true;
         count++;
