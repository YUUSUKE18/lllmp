import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=");
            return;
        }

        long count = 0;
        long maxValue = Long.MIN_VALUE - 1; // Safe lower bound for initial value check
        
        boolean hasValue = false;

        String[] parts = line.split(",");
        
        if (parts.length > 0 && !"".equals(parts[0].trim())) {
            try {
                count++;
                long numVal = Long.parseLong(parts[0]); 
                
                if (!hasValue) {
                    maxValue = numVal;
                    hasValue = true;
                } else {
                    if (numVal > maxValue) {
                        maxValue = numVal;
                    }
                }
            } catch (NumberFormatException e) {}

        } 

        for(int i=1;i<parts.length;i++) {
             try{
                 String trimedPart = parts[i].trim();
                 if(!"".equals(trimedPart)){
                     count++;
                     long val = Long.parseLong(trimedPart); 
                     
                    if (!hasValue) {
                        maxValue = val;
                        hasValue = true;
                    } else {
                        if (val > maxValue) {
                            maxValue = val;
                        }
                    }
                 }else{
                // skip empty element after trim
             }}catch(NumberFormatException e){}

        }

        
    System.out.println("count=" + count + " max=" +maxValue);    
        

    }
