import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String target = reader.readLine();
        int[] numbers = new int[256]; // 値の最大範囲は 64bit 整数

        while (reader.readLine() != null) {
            int number = Integer.parseInt(reader.readLine());
            numbers[number]++;
        }

        int count = 0;
        for (int i = 0; i < numbers.length; i++) {
            for (int j = i + 1; j < numbers.length; j++) {
                if (numbers[i] + numbers[j] == Integer.parseInt(target)) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
