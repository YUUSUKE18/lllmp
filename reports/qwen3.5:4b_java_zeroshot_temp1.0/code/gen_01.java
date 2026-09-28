import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        
        StringTokenizer st = new StringTokenizer(line);
        Set<Long> distinctNumbers = new HashSet<>();
        
        while(st.hasMoreTokens()){
            try {
                String token = st.nextToken();
                long value = Long.parseLong(token);
                distinctNumbers.add(value);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }
        
        long count = distinctNumbers.size();
        long sum = 0;
        for(long val : distinctNumbers){
            sum += val;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
