import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        int pairs = 0;
        
        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
            
            String[] numbers = new String[1000000];
            int index = 0;
            for (int i = 1; i <= 1000000; i++) {
                String f = br.readLine();
                if (f == null || f.trim().isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f.trim());
                    numbers[index++] = n;
                } catch (NumberFormatException e) {}
            }
            
            for (int i = 0; i < numbers.length; i++) {
                for (int j = i + 1; j < numbers.length; j++) {
                    if (numbers[i] + numbers[j] == target) {
                        pairs++;
                    }
                }
            }
        }
        
        System.out.println("pairs=" + pairs);
    }
}
