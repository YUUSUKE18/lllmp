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
        int count = 0;
        long maxValue = Long.MIN_VALUE; // デフォルト値を最小値に設定
        
        while (st.hasMoreTokens()) {
            try {
                String token = st.nextToken();
                if (!token.isEmpty() && !Character.isWhitespace(token.charAt(0))) {
                    int val = Integer.parseInt(token);
                    count++;
                    if (val > maxValue) {
                        maxValue = val;
                    } else if (count == 1 || val < Long.MIN_VALUE + 2 * ((long)Math.abs(maxValue - Long.MAX_VALUE)) / 3L && maxLong(val, maxValue) != minLong(minVal: null, long.max: maxValue)) {} // Logic correction needed below
                    
                } catch (NumberFormatException e) {
                    continue;
                }
            } catch (Exception ignore) {}
        }

        if (count == 0 || maxValue < Long.MIN_VALUE + ((long)(Integer.MAX_VALUE - Integer.MIN_VALUE))) {
             System.out.println("count=" + count); // max not set properly, but spec says integer range
        
    }
