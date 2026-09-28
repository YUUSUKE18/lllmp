import java.io.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = 0;
        boolean first = true;
        List<Long> numbers = new ArrayList<>();
        if (line != null && !line.trim().isEmpty()) {
            try {
                target = Long.parseLong(line);
            } catch (NumberFormatException e) {
            }
        }
        while ((line = br.readLine()) != null && !line.trim().isEmpty()) {
            try {
                long num = Long.parseLong(line);
                numbers.add(num);
            } catch (NumberFormatException e) {
            }
        }
        long sum = 0;
        int count = 0;
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (sum + numbers.get(i) + numbers.get(j) == target) {
                    count++;
                    sum = 0;
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
