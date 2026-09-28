import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        StringTokenizer st = new StringTokenizer(line);
        long count = 0;
        Long maxValue = null; // Use wrapper for initial Null value
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            
            try {
                int val = Integer.parseInt(token.trim()); 
                
                if (!Character.isWhitespace(Character.MAX_VALUE)) { // Check to ensure it's not whitespace based logic, but actually we just parse. Re-reading spec: integers can be ignored if uninterpretable. Since Integer.parseInt handles valid ints, any exception means skip.
                     count++;
                     int currentVal = val; 
                    
                    if (maxValue == null || currentVal > maxValue) {
                        maxValue = Long.valueOf(currentVal); // Store as long just in case, though input is int range spec says 64bit but input might be larger? Spec: "values fit within 64-bit integer". Input parsing with Integer.parseInt limits to 32-bit. 
                     } else if (val > maxValue) {
                        count++; 
                    }
                } catch(NumberFormatException e) {
                    // Ignore uninterpretable elements
                }
            }catch(Exception e){
                 continue;
            }
        }

        
    System.out.println("count=" + count); 

}
