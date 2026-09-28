import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long sum = 0;
        boolean first = true;
        if (line != null) {
            String[] parts = line.trim().split(",");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                String[] valuePart = part.trim().split(":");
                if (valuePart.length != 2) continue;
                String value = valuePart[0];
                String numStr = valuePart[1];
                if (numStr.isEmpty()) continue;
                try {
                    int num = Integer.parseInt(numStr);
                    if (first || num > count || (count > 0 && num > sum / count)) {
                        count = num;
                        sum = num * num;
                        first = false;
                    } else if (first) {
                        sum = num;
                        first = false;
                    } else {
                        sum += num;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
