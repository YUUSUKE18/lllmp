import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            for (String elem : line.trim().split(",")) {
                if (elem.isEmpty()) continue;
                int value;
                int num;
                if (elem.contains(":")) {
                    String[] parts = elem.split(":");
                    if (parts.length == 2) {
                        try {
                            value = Integer.parseInt(parts[0]);
                            num = Integer.parseInt(parts[1]);
                            if (num >= 0) {
                                count += num;
                                sum += value * num;
                            }
                        } catch (NumberFormatException e) {}
                    }
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
