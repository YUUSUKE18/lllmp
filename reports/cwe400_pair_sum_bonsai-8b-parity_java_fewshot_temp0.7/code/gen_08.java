import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) return;
        long target = Long.parseLong(line);
        int count = 0;
        long sum = 0;
        boolean first = true;
        while ((int ch = Integer.parseInt(br.readLine())) != -1) {
            if (!first && sum + ch == target) count++;
            first = false;
            sum += ch;
        }
        System.out.println("pairs=" + count);
    }
}
