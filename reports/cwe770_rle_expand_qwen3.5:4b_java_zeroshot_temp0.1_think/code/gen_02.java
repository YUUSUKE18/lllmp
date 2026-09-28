import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }
        
        Pattern pattern = Pattern.compile("\\d+:\\d+");
        long count = 0;
        long sum = 0;
        
        String input = sb.toString();
        if (input.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        String[] tokens = input.split(",");
        
        for (String token : tokens) {
            if (token.isEmpty()) continue;
            token = token.trim();
            if (token.isEmpty()) continue;
            
            Matcher matcher = pattern.matcher(token);
            if (matcher.matches()) {
                String[] parts = token.split(":");
                try {
                    long val = Long.parseLong(parts[0]);
                    long cnt = Long.parseLong(parts[1]);
                    count += cnt;
                    sum += val * cnt;
                } catch (NumberFormatException e) {
                    // Ignore invalid numbers
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
