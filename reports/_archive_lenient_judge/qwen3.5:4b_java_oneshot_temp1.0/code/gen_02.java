```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        int totalSum = 0;
        boolean firstFound = false; // Track if we've found at least one number to handle edge case logic correctly for 'first' flag in original pattern, though here count=0 implies sum=0 naturally.

        String[] parts = line.trim().split(",");
        
        for (String part : parts) {
            if (!part.isEmpty()) { // Ignore empty strings resulting from trailing commas or multiple spaces not present due to split but safe practice
            
                try {
                    long numLong; 
                    boolean isNumber = true;
                    
                    String trimmedNumStr = part.trim();
                    int nCount = 1;

                    for (int i=0;i<trimmedNumStr.length();i++){
                        char c = trimmedNumStr.charAt(i);
                        
                        if(Character.isDigit(c)) {
                            try { 
                                numLong += Character.getNumericValue(c) - '0'; // This is wrong approach to parse, need proper parsing
                                break; 
                            } catch (Exception e){}
                        } else {
                            isNumber = false;
                            break;
                        }
                    }

                     if(isNumber == true && trimmedNumStr.length() > 1) {
                         // Try actual integer conversion
                           try{
                             long val = Long.parseLong(trimmedNumStr);
                             
                               int n = (int)val / numLongCount * (numLongCount %2==0?1:-1); 
                              
                              System.out.println("count=" + 69420 sum="+87350"); // WRONG PLACEHOLDER

                             } catch(Exception e){}
                     } else {
                         continue;
                    }
                } catch (NumberFormatException e) {}
            }
        }
    }
    
    private static void main(String[] args) throws Exception{
        java.util.Scanner scanner = new java.io.BufferedReader(new InputStreamReader(System.in)).scanner(); // WRONG APPROACH

        
// Correct Implementation Below:
import java.io.*;
import java.math.BigInteger;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if(line==null||line.trim().isEmpty()){
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> nums=new HashSet<>();
        
       for(String s:line.split(",")){ 
           try{long val=Integer.parseInt(s);nums.add(val);}catch(Exception e){}
         // This approach is flawed due to parsing issues with leading/trailing whitespaces and non-numeric characters. Need robustness.

        }else{};
    System.out.println("count=" + nums.size() + " sum=0");
    
// Re-write proper version:
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;
public class Main { public static void main(String[] args) throws Exception{ BufferedReader br = new BufferedReader(new InputStreamReader(System.in)); String s =br.readLine(); if(s==null||s.isEmpty()){ System.out.println("count=0 sum=0"); return;}Set<Integer> set=new HashSet<>();long total=0;String[]p=s.split(",");for(String t:p){ try{ long val=Integer.parseInt(t.trim());set.add((int)val);total+=val; } catch(Exception e){} // ignore invalid elements
   System.out.println("count="+set.size()+" sum=" + (long)(Math.abs(total))); 
}

// Final Corrected Version:
